import Button from "../button/button";
import IconSend from "../icons/icon-send";

import "./message-writer.css";

/**
 * Message writer form containing a textarea and a send button.
 *
 * @returns {JSX.Element} the message writer form
 */
export default function MessageWriter() {
  return (
    <form className="message-writer">
      <textarea
        name="message"
        id="message"
        placeholder="Envoyer un message"
        aria-label="Envoyer un message"
        rows={1}
      />

      <Button ariaLabel="envoyer" icon={<IconSend />} />
    </form>
  );
}
