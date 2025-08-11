type TagProps = {
  label: string;
};

export default function Tag({ label }: TagProps) {
  return (
    <span className="text-sm border border-neutral-300 rounded-full px-3 py-1 whitespace-nowrap">
      {label}
    </span>
  );
}


