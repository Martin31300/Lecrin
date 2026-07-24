import type { RequestHandler } from "express";
import crypto from "node:crypto";
import argon from "argon2";
import { Resend } from "resend";
import db_client from "../../../database/client";
import type { Rows } from "../../../database/client";
import userRepository from "../user/userRepository";

const resend = new Resend(process.env.RESEND_API_KEY);

const forgotPassword: RequestHandler = async (req, res, next) => {
    try {
        const { mail } = req.body;
        const user = await userRepository.readByEmail(mail);
        if (!user) {
            res.status(200).json({ message: "Si cet email existe, un lien a été envoyé." });
            return;
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expiresAt = new Date(Date.now() + 3600 * 1000);

        await db_client.query(
            "DELETE FROM password_reset_tokens WHERE user_id = ?",
            [user.id]
        );
        await db_client.query(
            "INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)",
            [user.id, token, expiresAt]
        );

        const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

        await resend.emails.send({
            from: "onboarding@resend.dev",
            to: mail,
            subject: "Réinitialisation de votre mot de passe - L'Écrin",
            html: `
        <p>Bonjour ${user.name},</p>
        <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>Ce lien expire dans 1 heure.</p>
        <p>Si vous n'avez pas demandé de réinitialisation, ignorez cet email.</p>
      `,
        });

        res.status(200).json({ message: "Si cet email existe, un lien a été envoyé." });
    } catch (error) {
        next(error);
    }
};

const resetPassword: RequestHandler = async (req, res, next) => {
    try {
        const { token, password } = req.body;

        const [rows] = await db_client.query<Rows>(
            "SELECT * FROM password_reset_tokens WHERE token = ? AND expires_at > NOW()",
            [token]
        );

        if (!rows[0]) {
            res.status(400).json({ message: "Lien invalide ou expiré." });
            return;
        }

        const hashedPassword = await argon.hash(password);
        await db_client.query(
            "UPDATE user SET password = ? WHERE id = ?",
            [hashedPassword, rows[0].user_id]
        );
        await db_client.query(
            "DELETE FROM password_reset_tokens WHERE token = ?",
            [token]
        );

        res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        next(error);
    }
};

export default { forgotPassword, resetPassword };