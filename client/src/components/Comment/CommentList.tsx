import { useEffect, useState } from "react";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
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
function CommentList({
  artworkId,
  onClose,
  comIsOpen,
  artworkImage,
}: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [textAreaOpen, setTextAreaOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    fetch(`${API_URL}/api/artworks/${artworkId}/comments`)
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data) setComments(data);
      });
  }, [artworkId]);
  function textAreaOn() {
    setTextAreaOpen(true);
  }
  function textAreaOff() {
    setTextAreaOpen(false);
  }

  function send() {
    const trimmed = newComment.trim();

    fetch(`${API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify({
        text: trimmed,
        artwork_id: artworkId,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setNewComment("");
          return fetch(
            `${API_URL}/api/artworks/${artworkId}/comments`,
          );
        }
      })
      .then((res) => res?.json())
      .then((data) => {
        if (data) {
          setComments(data);
        }
      })
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
      if (res.ok) {
        setComments((prev) => prev.filter((com) => com.id !== commentId));
      }
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
          {!textAreaOpen ? (
            <button className="BtnPP" type="button" onClick={textAreaOn}>
              Ajouter un commentaire
            </button>
          ) : (
            <>
              <textarea
                className="textarea"
                placeholder="Écris ton commentaire ici..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button className="BtnPP" type="button" onClick={textAreaOff}>
                Annuler
              </button>
              <button
                className="BtnPP"
                type="button"
                onClick={() => {
                  if (!user || !user.id) {
                    setAuthModalOpen(true);

                  } else {
                    send();
                  }
                }}
              >
                Envoyer
              </button>
            </>
          )}
          {comments.length === 0 && <p>Aucun commentaire pour le moment.</p>}
          {comments.map((comment) => (
            <div key={comment.id} className="comment-item">
              <span>
                <img src={comment.userPic} alt={comment.userName} />
                {comment.userName}
              </span>
              <p>{comment.text}</p>

              <button type="button" onClick={() => destroy(comment.id)}>
                Supprimer
              </button>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}
export default CommentList;
