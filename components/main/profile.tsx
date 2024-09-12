import { Avatar, Button } from '@nextui-org/react'
import { GitHubLogoIcon, LaptopIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import React from 'react'
import { FxemojiAlien, HugeiconsBackpack03, HugeiconsLinkSquare01, OcticonLogoGithub16, SolarPhoneRoundedBold, StreamlineSendEmailSolid } from '../icons/skill-icons'
import { GradualSpacing } from '../ui/gradual-spacing'
import { PulsatingButton } from '../ui/pulsating-Button'
import { ShineBorder } from '../ui/shine-border'
import {ShinyButton}  from '../ui/shiny-button'

const profile = () => {
  return (
 <div className='flex flex-col sm:flex-row items-center justify-center gap-12 py-10 px-4 md:px-6 lg:px-8 max-w-5xl mx-auto'>
      <div className='flex flex-col items-center sm:items-end gap-8 sm:order-2 sm:w-1/2'>
        <Avatar 
          isBordered 
          color="default" 
          src="/profile/3.jpeg" 
          className='w-48 h-64 sm:w-56 sm:h-72 md:w-64 md:h-80 lg:w-72 lg:h-96'
        />
      </div>

 

      <div className='flex flex-col items-end justify-end sm:items-center sm:justify-end gap-4 sm:order-1 '>
        <div className='flex flex-col items-center md:items-start'>
          <span className='text-base sm:text-lg md:text-xl'>
            Hi <span className="wave wave-animation">👋</span> I'm
          </span>

          <GradualSpacing
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold -tracking-widest text-black dark:text-white text-center"
            text="Faizan Asad"
          />
          <GradualSpacing
            className="text-sm sm:text-base md:text-lg lg:text-xl -tracking-widest text-black dark:text-white ml-1 text-center"
            text="Full Stack Web / Blockchain Developer"
          />
        </div>
     
     

        <div className='flex flex-col sm:flex-row items-start gap-2 w-full mt-4'>
          <ShineBorder
            className="flex bg-gradient-to-br from-muted/85 to-muted/45 text-md  rounded-full w-full sm:w-auto"
            color={['#A07CFE', '#FE8FB5', '#FFBE7B']}
            borderRadius={100}
          >
            <Link href='/about'>
            <Button className='m-0 px-6 py-2 bg-transparent rounded-full w-full' variant='flat'>
              <span className='flex justify-center gap-2 items-center font-semibold capitalize'>
                <FxemojiAlien className="h-5 w-5" />
                About me
              </span>
            </Button></Link>
          </ShineBorder>
    
          <Button
          variant='faded' className='rounded-full w-full'  endContent={<HugeiconsLinkSquare01 width={12} height={12}/>}> <OcticonLogoGithub16 width={40} height={40} /> </Button>
                <Button 
            variant='faded' 
            startContent={<StreamlineSendEmailSolid className="h-5 w-5" />}
            className="rounded-full text-sm w-full sm:w-auto"
          >
          
          </Button>
        </div>
      </div>
    </div>
  )
}

export default profile