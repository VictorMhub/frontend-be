import beSVG from "../src/assets/beSVG.svg";
import lupeSVG from "../src/assets/lupeSVG.svg";
import { Input } from "../src/components/ui/input";

export function App() {
  return (
    <section className="flex flex-col w-full gap-[28px]">
      <header className="flex w-full h-[60px] border-2 items-center shadow-md">
        <img className="pl-6" src={beSVG} alt="Be Icon" />
      </header>

      <body className="flex w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h4 className="font-roboto font-medium pl-6 text-[24px]">
            Funcionários
          </h4>
          <div className="relative flex items-center w-[287px] mr-[35px]">
            <Input
              className="flex-1 h-[48px] pl-4 pr-12 font-roboto text-[16px] rounded-lg"
              placeholder="Pesquisar"
            />
            <img src={lupeSVG} alt="Search Icon" className="absolute right-3" />
          </div>
        </div>
      </body>
    </section>
  );
}
