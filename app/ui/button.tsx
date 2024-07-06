interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
   return (
    <button
      {...rest}
      className='flex h-10 items-center border-2 border-transparent mx-auto mt-5 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-white hover:border-primary hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50'>
      {children}
    </button>
  );
}