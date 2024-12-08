'use client';
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount} :{amount : number}) => {
  return (
    <div className='w-full'>
      <CountUp 
      end={amount}
      decimal=','
      prefix='&#8377;'
      duration={2}
      decimals={2}
      />
    </div>
  )
}

export default AnimatedCounter
