import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  return (
    <div className='flex h-screen w-full cursor-pointer flex-col justify-around bg-gradient-to-br from-[#232435] to-[#3a5a4c] p-2 font-roboto transition-opacity'>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
