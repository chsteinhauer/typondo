import * as styles from "./_contextmenu.styles";

export type ContextMenuProps = {
  items: ContextMenuItem[];
  params: unknown;
  top: number;
  left: number;
};

export type ContextMenuItem = {
  text: string;
  clickHandler: (params: unknown) => void;
};

export function ContextMenu(props: ContextMenuProps) {
  const { items } = props;
  return (
    <div
      className={styles.container}
      style={{ top: props.top, left: props.left }}
    >
      <ul>
        {items.map((item) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            key={item.text}
            className={styles.option}
            onClick={() => item.clickHandler(props.params)}
          >
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
