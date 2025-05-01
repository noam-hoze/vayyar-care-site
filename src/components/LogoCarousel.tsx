import React from "react";
import Image from "next/image";

const LogoCarousel: React.FC = () => {
    return (
        <div className="mt-20 w-full">
            {/* Container with hidden overflow */}
            <div className="w-full overflow-hidden py-8">
                {/* Flex strip with spacing and vertical centering */}
                {/* NOTE: Requires CSS @keyframes definition in global CSS */}
                <div className="animate-scroll flex items-center space-x-16 flex-shrink-0">
                    {/* Original set of logos using Next/Image (Scaled 1.5x) */}
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/anthropos.png`}
                        alt="Anthropos Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/appelo.png`}
                        alt="Appello Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/arquella.png`}
                        alt="Arquella Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/Austeco.png`}
                        alt="Austco Healthcare Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/blessen.png`}
                        alt="Blesen Logo"
                        width={150}
                        height={60}
                    />
                    {/* <Image
                        className="flex-shrink-0 object-contain"
                        src="/care/images/logos/dry.png"
                        alt="Dryfemount Care Logo"
                        width={150}
                        height={60}
                    /> */}

                    {/* Duplicated set for smooth looping (Scaled 1.5x) */}
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/anthropos.png`}
                        alt="Anthropos Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/appelo.png`}
                        alt="Appello Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/arquella.png`}
                        alt="Arquella Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/Austeco.png`}
                        alt="Austco Healthcare Logo"
                        width={150}
                        height={60}
                    />
                    <Image
                        className="flex-shrink-0 object-contain"
                        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/logos/blessen.png`}
                        alt="Blesen Logo"
                        width={150}
                        height={60}
                    />
                    {/*<Image*/}
                    {/*    className="flex-shrink-0 object-contain"*/}
                    {/*    src="/care/images/logos/dry.png"*/}
                    {/*    alt="Dryfemount Care Logo"*/}
                    {/*    width={150}*/}
                    {/*    height={60}*/}
                    {/*/>*/}
                </div>
            </div>
        </div>
    );
};

export default LogoCarousel;
