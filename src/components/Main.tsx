import Link from "./Link";

const Main = () => {
  return (
    <main className='flex flex-col items-center'>
      <div>
        <h1 className='text-center text-3xl text-white'>
          ABHISHEK CHANDRASENAN
        </h1>
      </div>
      <div className='flex flex-row gap-4 text-xl'>
        <Link href='https://github.com/theshakeabhi'>GitHub</Link>
        <Link href='https://www.linkedin.com/in/theshakeabhi/'>LinkedIn</Link>
        <Link href='https://dev.to/theshakeabhi'>Dev</Link>
      </div>
    </main>
  );
};

export default Main;
