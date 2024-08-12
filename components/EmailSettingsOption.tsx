import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";

export const EmailSettingsOption = () => {
  return (
    <form
      // onSubmit={handleUpdateProject}
      className="space-y-10  w-full h-full"
      action=""
    >
      <div className="flex mt-10">
        <h1 className="font-semibold">
          enable sending emails after successful payments
        </h1>

        <Switch />
      </div>

      <div className="">
        <Label>enter greetings title</Label>
        <Input name="greeting" placeholder="Enter here" className="mt-2 " />
      </div>
      <div className="">
        <Label>enter welcome message</Label>
        <Textarea name="message" placeholder="Enter here" className="mt-2 " />
      </div>

      <div className="">
        <Label>enter magic link redirection</Label>
        <Input
          name="magiclink"
          placeholder="eg: https://thepaypage.me/"
          className="mt-2"
        />
      </div>

      <div className="">
        <Label>enter signing off text</Label>
        <Input name="signingoff" placeholder="Enter here" className="mt-2 " />
      </div>
      <div className="">
        <Label>enter address of email sent location (optional)</Label>
        <Input name="address" placeholder="Enter here" className="mt-2 " />
      </div>
    </form>
  );
};
