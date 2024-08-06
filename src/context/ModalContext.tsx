import { createContext, FC, ReactNode, useState } from "react";

export const modalContext = createContext<modalContextProps>({
  modalState: false,
  setModalState: () => {},
});

export const ModalContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalState, setModalState] = useState<boolean>(false);
  return (
    <modalContext.Provider value={{ modalState, setModalState }}>
      {children}
    </modalContext.Provider>
  );
};
