const AppBackground = () => {
  return (
    <div className='absolute top-0 left-0 w-full h-1/2 z-0 overflow-hidden pointer-events-none'>
      <img
        src='/src/assets/background-cine.png'
        alt='Pessoas em uma sala de cinema'
        className='w-full h-full object-cover object-[center_-340px] opacity-40 select-none'
      />
      <div className='absolute inset-0 bg-cubos-overlay' />
    </div>
  );
};

export default AppBackground;
