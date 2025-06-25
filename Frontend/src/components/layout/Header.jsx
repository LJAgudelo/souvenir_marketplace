import React from 'react';
import ButtonCreateAccount from '../ui/ButtonCreateAccount';
import ButtonStartAccount from '../ui/ButtonStartAccount';

// Importación de imágenes
import bannerMarket from '../../assets/images/bannerMarket.png';
import bannerChile from '../../assets/images/bannerChile.JPG';
import bannerColombia from '../../assets/images/bannerColombia.JPG';
import bannerBolivia from '../../assets/images/bannerBolivia.JPG';

const Header = () => {
    return (
        <div className="bg-[var(--createdlightYellow)] h-auto overflow-hidden">

            {/* Banner principal */}
            <div className="relative w-full h-auto">
                <img
                    src={bannerMarket}
                    alt="Banner principal"
                    className="object-cover w-full h-auto max-w-full"
                />

                {/* Botones centrados en el banner */}
                <div className="absolute bottom-5 md:bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3 md:gap-5">
                    <ButtonCreateAccount />
                    <ButtonStartAccount />
                </div>
            </div>

            {/* Banners de países */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 p-4 sm:p-6">

                {/* Chile */}
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src={bannerChile}
                        alt="Chile"
                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-sm"
                    />
                    <h3 className="font-serif text-base sm:text-lg md:text-xl">Chile</h3>
                </div>

                {/* Colombia */}
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src={bannerColombia}
                        alt="Colombia"
                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-sm"
                    />
                    <h3 className="font-serif text-base sm:text-lg md:text-xl">Colombia</h3>
                </div>

                {/* Bolivia */}
                <div className="flex flex-col items-center space-y-2">
                    <img
                        src={bannerBolivia}
                        alt="Bolivia"
                        className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-sm"
                    />
                    <h3 className="font-serif text-base sm:text-lg md:text-xl">Bolivia</h3>
                </div>
            </div>
        </div>
    );
};

export default Header;
