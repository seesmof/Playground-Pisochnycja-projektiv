"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Terminal,
  FileWarning,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  CalendarIcon,
  Twitter,
  Mail,
  Facebook,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { DataTable } from "./payments/data-table";
import { columns } from "./payments/columns";
import { payments } from "./payments/payment-data";
import { spawn } from "child_process";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { clear } from "console";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Home() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [datePickerDate, setDatePickerDate] = React.useState<Date>();
  const [progressValue, setProgressValue] = React.useState(0);
  const [resetProgress, setResetProgress] = React.useState(0);

  React.useEffect(() => {
    const stageNull = setTimeout(() => {
      setProgressValue(0);
    }, 0);
    const stageOne = setTimeout(() => {
      setProgressValue(10);
    }, 500);
    const stageTwo = setTimeout(() => {
      setProgressValue(46);
    }, 2600);
    const stageThree = setTimeout(() => {
      setProgressValue(61);
    }, 2900);
    const stageFour = setTimeout(() => {
      setProgressValue(85);
    }, 3500);
    const stageFive = setTimeout(() => {
      setProgressValue(100);
    }, 4200);
    return () => {
      clearTimeout(stageOne);
      clearTimeout(stageTwo);
      clearTimeout(stageThree);
      clearTimeout(stageFour);
      clearTimeout(stageFive);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col p-4 gap-4 max-w-6xl mx-auto">
      <ThemeToggle />

      <Alert>
        <Mail className="w-4 h-4" />
        <AlertTitle>Alert</AlertTitle>
        <AlertDescription>
          This is a default alert. It can be dismissed. Please pay attention to
          it. Use it whenever you feel like. Usage is not limited to just places
          where you need it, but also to the places where you don't.
        </AlertDescription>
      </Alert>

      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>Do we have a main office?</AccordionTrigger>
          <AccordionContent>
            Yes we do indeed. You can get the address of our headquarters, which
            is located in New York City, on our website, please follow the{" "}
            <a href="#" className="underline">
              link
            </a>
            .
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger>Are we hiring?</AccordionTrigger>
          <AccordionContent>
            We are indeed. You can get additional information on our{" "}
            <a href="#" className="underline">
              website
            </a>
            . Please keep in mind that we need only qualified and well-rounded
            specialists, so please look into the requirements of the job before
            reaching out.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger>How old is our company?</AccordionTrigger>
          <AccordionContent>
            Our company is <span className="font-bold">10</span> years old. You
            can get our full history by following the{" "}
            <a href="#" className="underline">
              link
            </a>
            . Our company was founded by Patrick Patterson, a remarkable
            engineer in the field of electrodynamics who decided to contribute
            his knowledge to the world of photography.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="default" className="w-max">
            Open Alert Dialog
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Alert Dialog</AlertDialogTitle>
            <AlertDialogDescription>
              This is an alert dialog. It can be dismissed. It can also be
              closed and confirmed. Please make your choice and click the option
              you feel like clicking.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Avatar>
        <AvatarImage src="https://github.com/seesmof.png" alt="@seesmof" />
        <AvatarFallback>SE</AvatarFallback>
      </Avatar>

      <Card className="w-max">
        <CardHeader>
          <CardTitle>Oleh Onyshchenko</CardTitle>
          <CardDescription>
            A capable frontend web developer with a passion for creating
            responsive, scalable, and accessible web UIs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-medium mb-1">Projects</h3>
          <ul className="flex flex-col list-disc">
            <li className="ml-4">SpaceX Website</li>
            <li className="ml-4">Local Clinic Website</li>
            <li className="ml-4">Social Media App</li>
            <li className="ml-4">Photography Website</li>
          </ul>

          <h3 className="text-lg font-medium mt-4">Skills</h3>
          <div className="flex flex-row gap-2 py-2 flex-wrap">
            <Badge variant="default" className="bg-slate-300">
              Next.js
            </Badge>
            <Badge variant="default" className="bg-blue-200">
              React
            </Badge>
            <Badge variant="default" className="bg-teal-200">
              TailwindCSS
            </Badge>
            <Badge variant="default" className="bg-neutral-300">
              ShadCN
            </Badge>
            <Badge variant="default" className="bg-emerald-200">
              TypeScript
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h2 className="text-xl font-medium">Feel free to get in touch</h2>
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2 pt-2">
              <Button size="icon" variant={"outline"}>
                <Twitter className="w-4 h-4" />
              </Button>
              <Button size="icon" variant={"outline"}>
                <Mail className="w-4 h-4" />
              </Button>
              <Button size="icon" variant={"outline"}>
                <Facebook className="w-4 h-4" />
              </Button>
            </div>
            <Button variant={"default"}>Close</Button>
          </div>
        </CardFooter>
      </Card>

      <div className="flex flex-row items-center gap-2">
        <Badge variant="outline">Entertainment</Badge>
        <Badge variant="outline">Fun</Badge>
        <Badge variant="outline">Cool</Badge>
      </div>

      <div className="flex flex-row items-center gap-2 flex-wrap">
        <Button variant="default">Default</Button>
        <Button disabled>Disabled</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <div className="flex flex-row items-center gap-2">
        <Calendar mode="default" className="rounded-lg border cursor-pointer" />
      </div>

      <Card className="w-max">
        <CardHeader>
          <CardTitle>Payment information</CardTitle>
          <CardDescription>
            Please enter your payment information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2 list-disc">
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="cardNumber" />
              <label
                htmlFor="cardNumber"
                className="leading-none text-sm font-medium"
              >
                Card number
              </label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="expirationDate" />
              <label
                htmlFor="expirationDate"
                className="leading-none text-sm font-medium"
              >
                Expiration date
              </label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <Checkbox id="cvc" />
              <label htmlFor="cvc" className="leading-none text-sm font-medium">
                CVC
              </label>
            </div>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-row gap-2">
          <Button variant={"outline"}>Cancel</Button>
          <Button variant={"default"}>Confirm</Button>
        </CardFooter>
      </Card>

      <Collapsible>
        <CollapsibleTrigger
          className="font-medium leading-none flex items-center gap-2"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
          Can I use this in my project?
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 ml-8">
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
      <p>
        Window crew feet port dollar depth principal anything strike wing forgot
        mind orange surprise imagine can accident doctor began coast prepare
        thank fix medicine
      </p>

      <Command className="border rounded-lg">
        <CommandInput placeholder="Type a command to run..." />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          <CommandGroup heading="File">
            <CommandItem className="cursor-pointer">Calendar</CommandItem>
            <CommandItem className="cursor-pointer">Search Emoji</CommandItem>
            <CommandItem className="cursor-pointer">Calculator</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Edit">
            <CommandItem className="cursor-pointer">Profile</CommandItem>
            <CommandItem className="cursor-pointer">Billing</CommandItem>
            <CommandItem className="cursor-pointer">Settings</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>

      <ContextMenu>
        <ContextMenuTrigger className="w-full border rounded-lg text-center p-6 font-medium">
          Right click
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Profile</ContextMenuItem>
          <ContextMenuItem>Team</ContextMenuItem>
          <ContextMenuItem>Rewards</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>Billing</ContextMenuItem>
          <ContextMenuItem>Subscribtion</ContextMenuItem>
          <ContextMenuItem>Files</ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuLabel>Settings</ContextMenuLabel>
        </ContextMenuContent>
      </ContextMenu>

      <DataTable columns={columns} data={payments} />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !datePickerDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            {datePickerDate ? (
              format(datePickerDate, "PPP")
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={datePickerDate}
            onSelect={setDatePickerDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default" className="w-max">
            Open Dialog
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure absolutely hundred percent?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-max" variant={"default"}>
            Open Dropdown
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Help</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="default" className="w-max self-center">
            Show Hover Card
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <p>
            opinion carry bush gain foreign known title end thrown level natural
            hurried ride storm of distance addition national card stared noon
            announced brother bill
          </p>
          <p className="mt-2">
            exciting definition pretty manner spend funny tall nine deal solid
            say whole joy sink belong hair birthday leaving pleasant deep
            husband two soldier bus
          </p>
        </HoverCardContent>
      </HoverCard>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>

      <Label htmlFor="email">Your email address</Label>

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              New Tab
              <MenubarShortcut>Ctrl+T</MenubarShortcut>
            </MenubarItem>
            <MenubarItem>New Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarItem>Print</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent className="p-2 grid gap-2">
              <NavigationMenuLink>Link</NavigationMenuLink>
              <NavigationMenuLink>Link</NavigationMenuLink>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Documentation
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <p>
        ate eleven couple won anywhere bark rule anyone mix read present perfect
        lady thick spell on pay calm chapter paragraph rice fort nervous
        gasoline
      </p>
      <p>
        universe remember cutting useful typical depth fruit plant low whale
        dozen calm according somehow mental railroad increase closer pound story
        ought knew name battle
      </p>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="default" className="w-max">
            Open Popover
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="grid gap-2">
            <p className="font-medium">Place content in here</p>
            <p>
              Familiar stage did when exercise author those people closer
              operation grandfather useful sell heat burn this word want free
              coal plain finger drew thick
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <Progress value={progressValue} />

      <RadioGroup defaultValue="default">
        <div className="flex items-center gap-2">
          <RadioGroupItem value="default" id="default" />
          <Label htmlFor="default">Default</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value="different" id="different" />
          <Label htmlFor="different">Different</Label>
        </div>
      </RadioGroup>

      <ScrollArea className="h-32 border rounded-lg w-full max-w-sm">
        <div className="grid gap-2 p-4">
          <h4 className="font-medium text-lg">
            Muscle year fairly till however
          </h4>
          <p>
            Fact fruit ago nor blood task fear brush clay smoke bark parent
            season ever mean pot mark tip light present somehow hay simple thy
            constantly soon nervous mice probably trouble so wonder arrive
            notice around nuts aboard table period wagon faster soldier every
            local thing surface what voice
          </p>
          <p>
            Pressure room cow fought character forth ocean lot compound learn
            truth grade claws population machinery industrial began felt member
            label clay missing express aloud
          </p>
          <blockquote className="border-l-2 pl-2">
            Activity complex eat visitor rest ranch lying lesson two mail
            principal been whole vertical still spirit cave unless actually said
            education to his experiment
          </blockquote>
          <p>
            Found shirt among thou against basic fireplace will quickly
            impossible village happened ran wish corn cover ill wild was
            themselves earlier change magic or flame difficulty known fix engine
            important consider stock saved mirror mysterious disease unit gun
            dig diagram view character running typical nothing experiment food
            remove
          </p>
          <h4 className="font-medium text-lg">
            Wing carry finest mark syllable
          </h4>
          <p>
            Electric which agree crop shake feed wrapped shown desert curve
            introduced here visit flame gold morning shelf wash simplest goose
            yesterday go shoulder deep alone successful month appropriate away
            rod win closer therefore became return mark tide flat its indeed
            clean keep exact butter flight obtain bent system
          </p>
          <p>
            Week customs asleep practical copper fly remove may wet lucky
            distance throw detail lay seeing function whale rest at later
            comfortable strength recent nails
          </p>
        </div>
      </ScrollArea>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a system" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Public Transport</SelectLabel>
            <SelectItem value="bus">Bus</SelectItem>
            <SelectItem value="tram">Tram</SelectItem>
            <SelectItem value="metro">Metro</SelectItem>
            <SelectItem value="trolleybus">Trolley Bus</SelectItem>
            <SelectItem value="monorail">Monorail</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="grid space-y-4">
        <div className="grid">
          <h2 className="font-medium text-lg">Closely bag connected exist</h2>
          <p className="text-muted-foreground">
            account way morning shot though shake care sound column successful
            cost breath second market
          </p>
        </div>
        <Separator />
        <div className="flex justify-between space-x-4">
          <p>
            city finally meant large nuts sunlight club identity view grain
            shore if turn lose change sing then engine course seldom begun ball
            stranger rose
          </p>
          <Separator orientation="vertical" />
          <p>
            note golden invented feet magic sign fine essential exclaimed window
            suddenly place possible having shape planet column nice generally
            characteristic faster today inch plant
          </p>
          <Separator orientation="vertical" />
          <p>
            soil cool among continent major political bridge bright speed swept
            key sun measure therefore damage species hall greatest whole lack
            hardly went dress fur
          </p>
        </div>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="default" className="w-max">
            Open Sheet
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Brain is consist hay recently</SheetTitle>
            <SheetDescription>
              Wall setting yesterday pen additional problem wool told grabbed
              fine structure spell
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-2 py-4">
            <p>
              gasoline introduced must kids chamber typical rice modern hundred
              trunk bare rocket colony experiment silence respect shallow best
              weak bell understanding inside film flight
            </p>
            <p>
              dish create journey scientific fish lead herd screen strong broad
              great kill bill health nervous evidence or bent dress dried stuck
              organization famous court
            </p>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="button">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
}
