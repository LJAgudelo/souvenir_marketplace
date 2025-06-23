import React from 'react'
import ButtonCreateAccount from '../ui/ButtonCreateAccount'
import ButtonStartAccount from '../ui/ButtonStartAccount'

// importación de imagenes
import bannerMarket from '../../assets/images/bannerMarket.png'
import bannerChile from '../../assets/images/bannerChile.JPG'
import bannerColombia from '../../assets/images/bannerColombia.JPG'
import bannerBolivia from '../../assets/images/bannerBolivia.JPG'

const Header = () => {
    return (
        <>
            <div className='bg-[var(--createdlightYellow)] h-auto'>
                <div className="relative w-full h-auto">

                    <img
                        src={bannerMarket}
                        alt='Bannerprincipal'
                        className='object-cover max-w-full h-auto aspect-[17/10]'
                    />

                    <div className="absolute bottom-5 md:bottom-[3.90rem] left-1/6 transform -translate-x-2/3 flex gap-5 w-19 md:w-50">
                        <ButtonCreateAccount />
                        <ButtonStartAccount />
                    </div>
                </div>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-6 p-6">
                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src={bannerChile}
                            alt="bannerChile"
                            className="w-20 h-20 sm:w-90 sm:h-45 object-cover rounded-sm"
                        />
                        <h3 className="font-serif text-base sm:text-lg md:text-xl">Chile</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src={bannerColombia}
                            alt="bannerColombia"
                            className="w-20 h-20 sm:w-90 sm:h-45 object-cover rounded-sm"
                        />
                        <h3 className="font-serif text-base sm:text-lg md:text-xl">Colombia</h3>
                    </div>

                    <div className="flex flex-col items-center space-y-2">
                        <img
                            src={bannerBolivia}
                            alt="bannerBolivia"
                            className="w-20 h-20 sm:w-90 sm:h-45 object-cover rounded-sm"
                        />
                        <h3 className="font-serif text-base sm:text-lg md:text-xl">Bolivia</h3>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Header