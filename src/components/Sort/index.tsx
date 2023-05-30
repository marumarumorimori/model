import React, { useState } from "react";
import styles from "./style.scss";
import Pulldown, { Item } from "@/components/Pulldown";
import { getSmartphoneOS } from "@/utils/common";

interface Props {
  items: Item[];
}

const Sort: React.FunctionComponent<Props> = (props) => {
  const [showChildren, setShowChildren] = useState(false);
  const [text, setText] = useState<string>(props.items[0].text);

  const os = getSmartphoneOS();

  if (!props.items.length) return null;

  return (
    <div>
      <div
        className={styles.parent}
        onClick={() => setShowChildren(!showChildren)}
      >
        {os !== "ios" ? (
          <>
            <div className={styles.icon} />
            <div className={styles.parentText}>{text}</div>
            {showChildren && (
              <Pulldown
                items={props.items}
                className={styles.pulldown}
                onClose={() => setShowChildren(false)}
                onChange={(item) => setText(item.text)}
              />
            )}
          </>
        ) : (
          <div className={styles.selectContainer}>
            <select>
              {props.items.map((item, index) => (
                <option
                  value={item.value}
                  onSelect={() => item.onClick(item.value)}
                  key={index}
                >
                  {item.text}
                </option>
              ))}
            </select>
            <div className={styles.selectButton}>
              <div className={styles.icon} />
              <div className={styles.parentText}>{text}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sort;
