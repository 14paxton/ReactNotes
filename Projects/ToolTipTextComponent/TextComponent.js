

export const TextComponent = React.forwardRef((props) => {
  const [text, setText] = useState();
  const [disableTooltip, setDisableToolTip] = useState(true);
  const ref = useRef();

  useEffect(() => {
    const modify = ref?.current?.offsetWidth < ref?.current?.scrollWidth;
    if (modify) {
      setText(ref?.current?.innerText);
      setDisableToolTip(false);
    }
  }, []);

  return (
    <Tooltip title={text} arrow disableHoverListener={disableTooltip}>
      <span>
        {React.Children.map(props.children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, { ref: ref });
          }
        })}
      </span>
    </Tooltip>
  );
});
