import beSVG from '../src/assets/beSVG.svg';

export function App() {
  return (
   <section className='flex w-full'>
      <header className='flex w-full h-[60px] border-2 items-center shadow-md'>
        <img  className='pl-6' src={beSVG} alt="Be Icon" />
      </header>
   </section>
  )
}

