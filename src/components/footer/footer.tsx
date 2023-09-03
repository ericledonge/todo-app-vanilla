import "./footer.styles.css";

import { System } from "../../models";
import { useGetSystemUsed, useSetSystemUsed } from "../../store";

export const Footer = () => {
  const systemUsed = useGetSystemUsed();
  const setSystemUsed = useSetSystemUsed();

  return (
    <footer>
      <div className="footer-container">
        <div className="flex-container" />

        <div className="flex-container-center">
          <p>© 2023</p>
        </div>

        <div className="flex-container-flex-end">
          <select
            value={systemUsed}
            onChange={(event) => setSystemUsed(event.target.value as System)}
          >
            <option value="JSON_SERVER">JSON_SERVER</option>
            <option value="Connected">Connected</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
