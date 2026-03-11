import './framer/styles.css'

import SectionContactFramerComponent from './framer/section-contact'
import MapFramerComponent from './framer/map'
import FocusCardFramerComponent from './framer/focus-card'
import PrimaryFramerComponent from './framer/primary'
import ProductCardWrapFramerComponent from './framer/product-card-wrap'
import SecondaryFramerComponent from './framer/secondary'

export default function App() {
  return (
    <div className='flex flex-col items-center gap-3 bg-[rgb(255,_255,_255)]'>
      <SectionContactFramerComponent.Responsive/>
      <MapFramerComponent.Responsive/>
      <FocusCardFramerComponent.Responsive
        IHMAQA45k={"Advancing understanding of water and cryosphere processes to strengthen water and energy security."}
        mnsQP78No={"Energy & Water"}
      />
      <PrimaryFramerComponent.Responsive
        BYNIrUSxY={"Learn More"}
        hYruqSCKG={"/about"}
      />
      <ProductCardWrapFramerComponent.Responsive
        jOBZrX19z={""}
        tRSDBrySU={"undefined"}
      />
      <SecondaryFramerComponent.Responsive
        BYNIrUSxY={"Start a Project"}
        F3zKmwx_W={"/contact"}
      />
    </div>
  );
};