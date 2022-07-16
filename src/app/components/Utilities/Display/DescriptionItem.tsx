const DescriptionItem: React.FC<any> = ({ title, content, ...props }) => {
  return (
    <div className="description-wrapper" {...props}>
      <p className="item-headline">{title}</p>
      <p className="item-label">{content}</p>
    </div>
  );
};

export default DescriptionItem;
