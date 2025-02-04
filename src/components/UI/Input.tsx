type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ onChange }: Props) {
  return (
    <input
      className="text-background w-full px-4 py-2 rounded-md border border-gray-300 focus:border-black focus:ring-4 focus:ring-black focus:ring-opacity-50 outline-background transition-all"
      type="text"
      placeholder="username"
      onChange={onChange}
      style={{ letterSpacing: "1px" }}
    />
  );
}
