import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUser } from "../../contexts/user.context";
import type { Comment } from "../../types/vite-env";
import { API_URL } from "../../utils/api";
import "./CommentList.css";
import AuthModal from "../Modal/AuthModal";

Modal.setAppElement("#root");

interface CommentListProps {
  artworkId: number;
  onClose: () => void;
  comIsOpen: boolean;
  artworkImage: string;
}

function CommentList({ artworkId, onClose, comIsOpen, artworkImage }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [textAreaOpen, setTextAreaOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    fetch(`${API_URL}/api/artworks/${artworkId}/comments`)
      .then((res) => { if (res.ok) return res.json(); })
      .then((data) => { if (data) setComments(data); });
  }, [artworkId]);

  function send() {
    const trimmed = newComment.trim();
    if (!trimmed) return;
    fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({ text: trimmed, artwork_id: artworkId }),
    })
      .then((res) => {
        if (res.ok) {
          setNewComment("");
          setTextAreaOpen(false);
          return fetch(`${API_URL}/api/artworks/${artworkId}/comments`);
        }
      })
      .then((res) => res?.json())
      .then((data) => { if (data) setComments(data); })
      .catch((error) => console.error("une erreur est survenue", error));
  }

  function destroy(commentId: number) {
    fetch(`${API_URL}/api/comments/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    }).then((res) => {
      if (res.ok) setComments((prev) => prev.filter((com) => com.id !== commentId));
    });
  }

  return (
    <>
      {authModalOpen && <AuthModal onClose={() => setAuthModalOpen(false)} />}
      <Modal
        isOpen={comIsOpen}
        onRequestClose={onClose}
        contentLabel="Commentaires"
        className="react-modal-content"
        overlayClassName="react-modal-overlay"
      >
        <img src={artworkImage} alt="Artwork" className="comment-image" />
        <div className="comment-section">
          <div className="comment-list">
            {comments.length === 0 && (
              <p className="comment-empty">Aucun commentaire pour le moment.</p>
            )}
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <div className="comment-item-header">
                  <img src={comment.userPic} alt="" />
                  <span>{comment.userName}</span>
                </div>
                <p>{comment.text}</p>
                {user?.id === comment.user_id && (
                  <button type="button" className="deleteBtn" onClick={() => destroy(comment.id)}>
                    Supprimer
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="comment-actions">
            {!textAreaOpen ? (
              <button
                className="BtnPP"
                type="button"
                onClick={() => { if (!user) setAuthModalOpen(true); else setTextAreaOpen(true); }}
              >
                Ajouter un commentaire
              </button>
            ) : (
              <>
                <textarea
                  className="comment-textarea"
                  placeholder="Écris ton commentaire ici..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <div className="comment-buttons">
                  <button className="BtnPP" type="button" onClick={() => setTextAreaOpen(false)}>
                    Annuler
                  </button>
                  <button
                    className="BtnPP"
                    type="button"
                    onClick={() => { if (!user) setAuthModalOpen(true); else send(); }}
                  >
                    Envoyer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default CommentList;
