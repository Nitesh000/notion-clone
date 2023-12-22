import { Footer } from "../_componenets/footer";
import { Heading } from "../_componenets/heading";
import { Heros } from "../_componenets/heros";

const MarketingPage = () => {
  return (
    <div className="flex flex-col min-h-full">
      <div className="flex flex-col flex-1 gap-y-8 justify-center items-center px-6 pb-10 text-center md:justify-start">
        <Heading />
        <Heros />
        <Footer />
      </div>
    </div>
  );
};

export default MarketingPage;
