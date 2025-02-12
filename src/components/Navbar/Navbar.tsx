import { type FunctionComponent } from 'react';
import Link from 'next/link';

import logoutAction from '@/actions/logoutAction';
import ThemeSwitcher from '@/components/ThemeSwitcher/ThemeSwitcher';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import Logo from '../../../public/logo.svg';

const Navbar: FunctionComponent = () => {
  return (
    <div className="flex justify-between bg-black px-5 py-2 text-white dark:bg-black">
      <Link href="/playlists">
        <Logo className="h-10" width={100} alt="brand logo" />
      </Link>
      <div className="flex items-center">
        <ThemeSwitcher />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback className="bg-slate-700">N</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="#" onClick={logoutAction}>
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
