import "./footer.styles.css";

import { ChangeEvent } from "react";

// models
import { System } from "../../models";

// store
import { useGetSystemUsed, useSetSystemUsed } from "../../store";

export const Footer = () => {
  const systemUsed = useGetSystemUsed();
  const setSystemUsed = useSetSystemUsed();

  const handleSystemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSystemUsed(event.target.value as System);
  };

  return (
    <footer>
      <div className="footer-container">
        <div className="flex-container" />

        <div className="flex-container-center">
          <p>© 2023</p>
        </div>

        <div className="flex-container-flex-end">
          <select value={systemUsed} onChange={handleSystemChange}>
            <option value="KY_JSON_SERVER">KY_JSON_SERVER</option>
            <option value="FETCH_JSON_SERVER">FETCH_JSON_SERVER</option>
            <option value="NODE">NODE</option>
          </select>
        </div>
      </div>
    </footer>
  );
};
