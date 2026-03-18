import { Menu } from "./components/menu";

export function App() {
  return (
    <div className="w-full h-screen bg-linear-to-br from-[#121C84] to-[#8278DA] text-neutral-100 flex items-center justify-center">
      <div className="w-10/12 h-10/12 bg-neutral-950 rounded-2xl outline-4 outline-white/10">
        <header className="flex items-center justify-end p-10">
          <Menu />
        </header>
      </div>
    </div>
  );
}
