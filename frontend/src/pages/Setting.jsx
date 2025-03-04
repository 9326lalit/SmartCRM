import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
// import { useTheme } from "next-themes";

const Settings = () => {
  // const { theme, setTheme } = useTheme();
  const [userData, setUserData] = useState({
    username: "John Doe",
    email: "johndoe..example.com",
    password: "",
    notifications: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleToggleNotifications = () => {
    setUserData({ ...userData, notifications: !userData.notifications });
  };

  const handleSave = () => {
    alert("Settings saved successfully! 🎉");
    // Here, you can integrate API calls to update user settings
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-semibold">Settings</h2>

      {/* Profile Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Username</Label>
            <Input name="username" value={userData.username} onChange={handleChange} />
          </div>
          <div>
            <Label>Email</Label>
            <Input name="email" value={userData.email} onChange={handleChange} />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>New Password</Label>
            <Input name="password" type="password" value={userData.password} onChange={handleChange} />
          </div>
          <Button onClick={handleSave}>Update Password</Button>
        </CardContent>
      </Card>

      {/* Theme & Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Dark Mode</Label>
            {/* <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")} /> */}
          </div>
        </CardContent>
      </Card>

      {/* Notifications Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Email Notifications</Label>
            <Switch checked={userData.notifications} onCheckedChange={handleToggleNotifications} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
