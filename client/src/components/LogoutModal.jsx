import React, { useRef, useEffect, useCallback } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import { useSpring, animated } from "react-spring";

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWrapper = styled.div`
  width: 300px;
  height: 200px;
  background: #fff;
  color: #000;
  z-index: 10;
  border-radius: 20px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-areas: "title ... close" "body" "button ... button";
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  position: relative;
  * {
    margin: 20px 0 20px 0;
  }
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 15px;
  width: 24px;
  height: 24px;
  padding: 0;
  z-index: 10;
  color: red;
`;

function LogoffModal({ showModal, setShowModal, onLogout }) {
  const modalRef = useRef();

  const animation = useSpring({
    config: { duration: 150 },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeModal = (e) => {
    if (modalRef.current === e.target) setShowModal(false);
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        console.log("I pressed");
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <Background ref={modalRef} onClick={closeModal}>
          <animated.div style={animation}>
            <ModalWrapper>
              <div>
                Are you sure?{" "}
                <CloseModalButton
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div>
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={onLogout}>Logout</button>
              </div>
            </ModalWrapper>
          </animated.div>
        </Background>
      ) : null}
    </>
  );
}

export default LogoffModal;
