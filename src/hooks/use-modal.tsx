import { ReactNode, useState } from "react";
import { Button } from "../components/button";

interface Content {
  title: string;
  body: ReactNode;
  onSubmit?: (formData: FormData) => void;
}

export const useModal = () => {
  const [content, setContent] = useState<Content>({
    title: "",
    body: "",
    onSubmit: () => {},
  });
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setContent({
      body: "",
      title: "",
      onSubmit: () => {},
    });
    setIsOpen(false);
  };

  return {
    isOpen,
    open(content: Content) {
      setContent(content);
      setIsOpen(true);
    },
    close,
    Modal: () => {
      if (!isOpen) return null;

      return (
        <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-75">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              content.onSubmit?.(new FormData(e.currentTarget));
              close();
            }}
            className="bg-white z-20 w-[40rem] border rounded-sm border-neutral-400 shadow-sm"
          >
            <div className="border-b border-neutral-400 p-3 flex justify-between items-center">
              <h3 className="text-lg">{content.title}</h3>
            </div>

            <div className="p-3">{content.body}</div>

            <div className="border-t border-neutral-400 p-3 flex justify-end space-x-2">
              <Button
                onClick={close}
                className="bg-neutral-200 text-black border-neutral-400"
              >
                Close
              </Button>
              {content.onSubmit ? <Button type="submit">Submit</Button> : null}
            </div>
          </form>
        </div>
      );
    },
  };
};
