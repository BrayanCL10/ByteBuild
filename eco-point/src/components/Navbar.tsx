type Props = {
  onLogin: () => void;
};

export default function Navbar({ onLogin }: Props) {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">
      <h1 className="text-2xl font-bold text-green-400">
        RECI
      </h1>

      <button
        onClick={onLogin}
        className="bg-white text-black px-5 py-2 rounded-xl font-medium hover:bg-slate-200"
      >
        Iniciar Sesión
      </button>
    </nav>
  );
}