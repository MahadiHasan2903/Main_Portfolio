import React from "react";

import Form from "../../lib/components/Contact/Form";
import { HomeIcon, MailIcon, PhoneCall } from "lucide-react";

const Contact = () => {
  return (
    <section>
      <div className="container mx-auto">
        <div className="grid xl:grid-cols-2 pt-12 xl:h-[480px] mb-6 xl:mb-24">
          <div className="flex flex-col justify-center">
            <div className="flex items-center mb-4 text-lg gap-x-4 text-primary">
              <span className="w-[30px] h-[2px] bg-primary"></span>
              Say Hello
            </div>
            <h1 className="max-w-md mb-8 h1">Let's Work Together.</h1>
            <p className="subtitle max-w-[400px]">
              Hey there! I'm thrilled to connect with you. Whether it's about an
              exciting project, a question, or just to say hello, I'm all ears.
              Let's embark on this journey together and turn ideas into reality.
            </p>
          </div>

          <div className="hidden w-full bg-top bg-no-repeat bg-contain xl:flex bg-contact_illustration_light dark:bg-contact_illustration_dark"></div>
        </div>
        <div className="grid mb-24 xl:grid-cols-2 xl:mb-32">
          <div className="flex flex-col mb-12 text-base gap-y-4 xl:gap-y-14 xl:mb-24 xl:text-lg">
            <div className="flex items-center gap-x-8">
              <MailIcon size={25} className="text-primary" />
              <div>hasan.mahadi2903@gmail.com</div>
            </div>

            <div className="flex items-center gap-x-8">
              <PhoneCall size={25} className="text-primary" />
              <div>+880 1704 672028</div>
            </div>

            <div className="flex items-center gap-x-8">
              <HomeIcon size={25} className="text-primary" />
              <div>738 East Manikdi, East Manikdi, Dhaka Cantonment-1206</div>
            </div>
          </div>

          <Form />
        </div>
      </div>
    </section>
  );
};

export default Contact;
