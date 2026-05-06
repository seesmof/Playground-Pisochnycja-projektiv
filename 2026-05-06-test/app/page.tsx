interface ParagraphProps {
  status: boolean;
}

function Paragraph({ status }: ParagraphProps) {
  return <p style={{ color: status ? "slateblue" : "inherit" }}>Some text.</p>;
}

export default function Page() {
  return (
    <div className="flex flex-col gap-3 p-3">
      <Paragraph status={true} />
      <Paragraph status={false} />
    </div>
  );
}
