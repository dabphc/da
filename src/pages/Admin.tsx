import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Project, Event, EventResource } from "@/types";
import { Plus, Trash2, Check, X, ExternalLink } from "lucide-react";

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events");
  const [user, setUser] = useState<any>(null); // Added user state
  
  // Data States
  const [events, setEvents] = useState<Event[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [resources, setResources] = useState<EventResource[]>([]);
  const [members, setMembers] = useState<any[]>([]);

  // Form States
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});
  const [newResource, setNewResource] = useState<Partial<EventResource>>({});
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [eventImageFile, setEventImageFile] = useState<File | null>(null);
  const [eventImagePreview, setEventImagePreview] = useState<string | null>(null);
  const [isUploadingEvent, setIsUploadingEvent] = useState(false);
  
  // Member Management States
  const [isMemberDialogOpen, setIsMemberDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);
  const [newMember, setNewMember] = useState<any>({
    email: '',
    full_name: '',
    role: 'member',
    club_role: '',
    skills: [],
    software: []
  });

  useEffect(() => {
    checkSession();
    fetchData();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }
    setUser(session.user);

    // Check if user is admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();
    
    if (profile?.role !== 'admin') {
        toast.error("Unauthorized access: Admins only");
        navigate("/");
        return;
    }

    setLoading(false);
  };

  const fetchData = async () => {
    await Promise.all([fetchEvents(), fetchProjects(), fetchResources(), fetchMembers()]);
  };

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (error) toast.error("Error fetching events");
    else setEvents(data || []);
  };

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (error) toast.error("Error fetching projects");
    else setProjects(data || []);
  };

  const fetchResources = async () => {
    const { data, error } = await supabase.from('event_resources').select('*').order('created_at', { ascending: false });
    if (error) toast.error("Error fetching resources");
    else setResources(data || []);
  };

  const fetchMembers = async () => {
    const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    if (error) toast.error("Error fetching members");
    else setMembers(data || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
    toast.info("Logged out successfully");
  };

  // --- Events Logic ---
  const handleCreateEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
        toast.error("Title and Date are required");
        return;
    }
    
    setIsUploadingEvent(true);
    let imageUrl = newEvent.image_url;
    
    // Upload image file if provided
    if (eventImageFile) {
      const { uploadImage } = await import('@/lib/uploadImage');
      const uploadedUrl = await uploadImage(eventImageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        setIsUploadingEvent(false);
        return;
      }
    }
    
    const { error } = await supabase.from('events').insert([{ ...newEvent, image_url: imageUrl }]);
    if (error) {
        toast.error(error.message);
    } else {
        toast.success("Event created successfully");
        setIsEventDialogOpen(false);
        setNewEvent({});
        setEventImageFile(null);
        setEventImagePreview(null);
        fetchEvents();
    }
    setIsUploadingEvent(false);
  };

  const handleDeleteEvent = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) toast.error(error.message);
    else {
        toast.success("Event deleted");
        fetchEvents();
    }
  };

  // --- Projects Logic ---
  const handleUpdateProjectStatus = async (id: number, status: 'approved' | 'rejected') => {
    const { error } = await supabase.from('projects').update({ status }).eq('id', id);
    if (error) toast.error(error.message);
    else {
        toast.success(`Project ${status}`);
        fetchProjects();
    }
  };

  // --- Resources Logic ---
  const handleAddResource = async () => {
    if (!newResource.title || !newResource.link || !newResource.event_id) {
        toast.error("Title, Link, and Event are required");
        return;
    }
    const { error } = await supabase.from('event_resources').insert([newResource]);
    if (error) toast.error(error.message);
    else {
        toast.success("Resource added");
        setNewResource({});
        fetchResources();
    }
  };


  // --- Members Logic ---
  const handleAddOrUpdateMember = async () => {
    const memberData = editingMember || newMember;
    
    if (!memberData.email || !memberData.full_name) {
      toast.error("Email and full name are required");
      return;
    }

    // If editing existing member, just update
    if (editingMember) {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: memberData.full_name,
          role: memberData.role,
          club_role: memberData.club_role,
          skills: memberData.skills,
          software: memberData.software,
          is_active: true
        })
        .eq('id', editingMember.id);

      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Member updated");
        setIsMemberDialogOpen(false);
        setEditingMember(null);
        setNewMember({ email: '', full_name: '', role: 'member', club_role: '', skills: [], software: [] });
        fetchMembers();
      }
      return;
    }

    // For new members, check if they exist
    const { data: authUser, error: authError } = await supabase
      .from('profiles')
      .select('id, role')
      .eq('email', memberData.email)
      .maybeSingle();

    if (authError) {
      toast.error("Error checking user: " + authError.message);
      return;
    }

    if (!authUser) {
      toast.error(
        "User hasn't logged in yet. Ask them to:\n1. Go to the login page\n2. Click 'Sign in with Google'\n3. They'll be blocked (expected)\n4. Come back here and promote them!",
        { duration: 8000 }
      );
      return;
    }

    // User exists, promote them
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: memberData.full_name,
        role: memberData.role,
        club_role: memberData.club_role,
        skills: memberData.skills,
        software: memberData.software,
        is_active: true
      })
      .eq('id', authUser.id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Member added successfully!");
      setIsMemberDialogOpen(false);
      setNewMember({ email: '', full_name: '', role: 'member', club_role: '', skills: [], software: [] });
      fetchMembers();
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm("Remove this member from the club?")) return;
    
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: false, role: null })
      .eq('id', memberId);

    if (error) toast.error(error.message);
    else {
      toast.success("Member removed");
      fetchMembers();
    }
  };

  const handleToggleMemberStatus = async (memberId: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_active: !currentStatus })
      .eq('id', memberId);

    if (error) toast.error(error.message);
    else {
      toast.success(currentStatus ? "Member deactivated" : "Member activated");
      fetchMembers();
    }
  };


  if (loading) return <div className="p-10 flex justify-center">Loading...</div>;

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border shadow-sm">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
                Welcome, {user?.user_metadata?.full_name?.split(' ')[0] || 'Admin'}
            </h1>
            <p className="text-muted-foreground mt-1">Manage events, approve work, and add resources.</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-border hover:bg-secondary hover:text-secondary-foreground">
            Sign Out
          </Button>
        </div>
        
        <Tabs defaultValue="events" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-[600px]">
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="projects">Work Approvals</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
          </TabsList>

          {/* EVENTS TAB */}
          <TabsContent value="events" className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">All Events</h2>
                <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
                    <DialogTrigger asChild>
                        <Button><Plus className="mr-2 h-4 w-4"/> Add Event</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Event</DialogTitle>
                            <DialogDescription>Create a new workshop, hackathon, or talk.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" value={newEvent.title || ""} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="date">Date</Label>
                                <Input id="date" type="datetime-local" value={newEvent.date || ""} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" value={newEvent.location || ""} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="eventImage">Event Image</Label>
                                <Input 
                                    id="eventImage" 
                                    type="file" 
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            setEventImageFile(file);
                                            const reader = new FileReader();
                                            reader.onloadend = () => {
                                                setEventImagePreview(reader.result as string);
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="cursor-pointer"
                                />
                                {eventImagePreview && (
                                    <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border">
                                        <img src={eventImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="text-xs text-muted-foreground">Or paste an image URL below:</div>
                                <Input 
                                    id="imageUrl" 
                                    placeholder="https://..." 
                                    value={newEvent.image_url || ""} 
                                    onChange={(e) => setNewEvent({...newEvent, image_url: e.target.value})} 
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="desc">Description</Label>
                                <Textarea id="desc" value={newEvent.description || ""} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateEvent} disabled={isUploadingEvent}>
                                {isUploadingEvent && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-foreground"></div>}
                                {isUploadingEvent ? 'Creating...' : 'Create Event'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map(event => (
                    <Card key={event.id}>
                        <CardHeader>
                            <CardTitle className="truncate">{event.title}</CardTitle>
                            <CardDescription>{new Date(event.date).toLocaleDateString()}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-500 line-clamp-2">{event.description}</p>
                            <div className="mt-4 flex justify-end">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-4">
             <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Pending Approvals</h2>
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Preview</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.filter(p => p.status === 'pending').length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No pending projects</TableCell>
                            </TableRow>
                        )}
                        {projects.filter(p => p.status === 'pending').map((project) => (
                            <TableRow key={project.id}>
                                <TableCell>
                                    <div className="h-12 w-12 rounded overflow-hidden">
                                        <img src={project.image_url} alt={project.title} className="h-full w-full object-cover" />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{project.title}</TableCell>
                                <TableCell>{project.category}</TableCell>
                                <TableCell><span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800">Pending</span></TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="icon" variant="ghost" onClick={() => window.open(project.instagram_link, '_blank')}>
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleUpdateProjectStatus(project.id, 'approved')}>
                                        <Check className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleUpdateProjectStatus(project.id, 'rejected')}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Approved Projects</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {projects.filter(p => p.status === 'approved').map(p => (
                        <div key={p.id} className="relative group rounded-md overflow-hidden aspect-square border">
                             <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Button variant="destructive" size="sm" onClick={() => handleUpdateProjectStatus(p.id, 'rejected')}>Reject</Button>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
          </TabsContent>

          {/* RESOURCES TAB */}
          <TabsContent value="resources" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Resource</CardTitle>
                        <CardDescription>Link a resource to an existing event.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Select Event</Label>
                            <Select onValueChange={(val) => setNewResource({...newResource, event_id: Number(val)})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an event" />
                                </SelectTrigger>
                                <SelectContent>
                                    {events.map(e => <SelectItem key={e.id} value={String(e.id)}>{e.title}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input placeholder="e.g. Slides, Recording" value={newResource.title || ""} onChange={(e) => setNewResource({...newResource, title: e.target.value})} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Link URL</Label>
                            <Input placeholder="https://..." value={newResource.link || ""} onChange={(e) => setNewResource({...newResource, link: e.target.value})} />
                        </div>
                        <Button onClick={handleAddResource}>Add Resource</Button>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Existing Resources</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                             {resources.map(res => {
                                const event = events.find(e => e.id === res.event_id);
                                return (
                                    <div key={res.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50">
                                        <div>
                                            <div className="font-medium">{res.title}</div>
                                            <div className="text-xs text-muted-foreground">{event?.title || 'Unknown Event'}</div>
                                        </div>
                                        <a href={res.link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm hover:underline">View</a>
                                    </div>
                                )
                             })}
                        </div>
                    </CardContent>
                </Card>
            </div>
          </TabsContent>

          {/* MEMBERS TAB */}
          <TabsContent value="members" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Club Members</h2>
              <Dialog open={isMemberDialogOpen} onOpenChange={(open) => {
                setIsMemberDialogOpen(open);
                if (!open) {
                  setEditingMember(null);
                  setNewMember({ email: '', full_name: '', role: 'member', club_role: '', skills: [], software: [] });
                }
              }}>
                <DialogTrigger asChild>
                  <Button><Plus className="mr-2 h-4 w-4"/> Add Member</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingMember ? 'Edit Member' : 'Add New Member'}</DialogTitle>
                    <DialogDescription>
                      {editingMember ? 'Update member details' : 'Add a new member to the club. User must login with Google first.'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="memberEmail">Email</Label>
                        <Input 
                          id="memberEmail" 
                          type="email"
                          value={editingMember ? editingMember.email : newMember.email}
                          onChange={(e) => editingMember 
                            ? setEditingMember({...editingMember, email: e.target.value})
                            : setNewMember({...newMember, email: e.target.value})
                          }
                          disabled={!!editingMember}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="memberName">Full Name</Label>
                        <Input 
                          id="memberName"
                          value={editingMember ? editingMember.full_name : newMember.full_name}
                          onChange={(e) => editingMember 
                            ? setEditingMember({...editingMember, full_name: e.target.value})
                            : setNewMember({...newMember, full_name: e.target.value})
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="memberRole">Role</Label>
                        <select 
                          id="memberRole"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={editingMember ? editingMember.role : newMember.role}
                          onChange={(e) => editingMember 
                            ? setEditingMember({...editingMember, role: e.target.value})
                            : setNewMember({...newMember, role: e.target.value})
                          }
                        >
                          <option value="member">Member</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="clubRole">Club Role</Label>
                        <select 
                          id="clubRole"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={editingMember ? editingMember.club_role || '' : newMember.club_role}
                          onChange={(e) => editingMember 
                            ? setEditingMember({...editingMember, club_role: e.target.value})
                            : setNewMember({...newMember, club_role: e.target.value})
                          }
                        >
                          <option value="">Select...</option>
                          <option value="Events">Events</option>
                          <option value="Design">Design</option>
                          <option value="3DArtist">3D Artist</option>
                          <option value="UI-UX">UI-UX</option>
                          <option value="Senate">Senate</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="skills">Skills (comma-separated)</Label>
                      <Input 
                        id="skills"
                        placeholder="UI/UX, Branding, Illustration"
                        value={editingMember ? (editingMember.skills || []).join(', ') : (newMember.skills || []).join(', ')}
                        onChange={(e) => {
                          const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          editingMember 
                            ? setEditingMember({...editingMember, skills: skillsArray})
                            : setNewMember({...newMember, skills: skillsArray});
                        }}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="software">Software (comma-separated)</Label>
                      <Input 
                        id="software"
                        placeholder="Figma, Photoshop, Illustrator"
                        value={editingMember ? (editingMember.software || []).join(', ') : (newMember.software || []).join(', ')}
                        onChange={(e) => {
                          const softwareArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          editingMember 
                            ? setEditingMember({...editingMember, software: softwareArray})
                            : setNewMember({...newMember, software: softwareArray});
                        }}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddOrUpdateMember}>
                      {editingMember ? 'Update Member' : 'Add Member'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Club Role</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Software</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member: any) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.full_name || member.email}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{member.email}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          member.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          member.role === 'member' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                        }`}>
                          {member.role || 'None'}
                        </span>
                      </TableCell>
                      <TableCell>{member.club_role || '-'}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(member.skills || []).slice(0, 2).map((skill: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
                              {skill}
                            </span>
                          ))}
                          {(member.skills || []).length > 2 && (
                            <span className="text-xs text-muted-foreground">+{member.skills.length - 2}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(member.software || []).slice(0, 2).map((sw: string, idx: number) => (
                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-secondary text-secondary-foreground">
                              {sw}
                            </span>
                          ))}
                          {(member.software || []).length > 2 && (
                            <span className="text-xs text-muted-foreground">+{member.software.length - 2}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          member.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {member.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setEditingMember(member);
                              setIsMemberDialogOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleMemberStatus(member.id, member.is_active)}
                          >
                            {member.is_active ? 'Deactivate' : 'Activate'}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleRemoveMember(member.id)}
                          >
                            Remove
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;