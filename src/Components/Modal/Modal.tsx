import { useState } from "react";
import "./Modal.css";
import { deleteProfile } from "../../util/users";
import { useNavigate } from "react-router-dom";
type ModalProps = {
    modalType: "Delete" | "Sign out"
    setShowModal: (bool: boolean) => void
}

const Modal = (props: ModalProps) => {

    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const nav = useNavigate();

    const handleDeleteUser = async () => {
        try {
            const status = await deleteProfile(password, setErrorMessage);
            if (status) {
                nav("/");
                props.setShowModal(false);
            }
            else return;
        } catch (error: any) {
            console.error(error);
            if (error.code) setErrorMessage(error.code);
            else setErrorMessage("Something went wrong");
        }
    }

    return (
        <div className="modal--wrapper">
            <div className="modal--container">
                <header>
                    <h2>
                        {
                            (props.modalType === "Delete") ?
                            "Delete account?" : "Sign out?"
                        }
                    </h2>
                    {
                        (errorMessage.length > 0) && <p className="error-message">{ errorMessage }</p>
                    }
                </header>
                <body>
                {
                  (props.modalType === "Delete") &&
                  <>
                    <h4>
                        You will not be able to recover your account.
                    </h4>
                   <input 
                    type="password"
                    placeholder="Password"
                    value = { password }
                    onChange = { (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  />
                  </>
                 
                }
                </body>
                <footer>
                    <button 
                        onClick = { handleDeleteUser }
                        className="modal--confirmButton">
                        { props.modalType }
                    </button>
                    <button
                        onClick = { ()=> props.setShowModal(false)}
                    >
                        Cancel
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default Modal;