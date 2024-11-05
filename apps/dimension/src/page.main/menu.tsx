type Props = {
  myMenuProp: string;
};

export function Menu(props: Props) {
  return <div>A menu {props.myMenuProp}</div>;
}
