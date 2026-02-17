import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Plus, LogOut, CheckCircle, Clock, XCircle } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Submission Form State
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({ category: 'Graphic' });
  const [submitting, setSubmitting] = useState(false);
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/login");
      return;
    }
    
    // Check if user is an active member
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, is_active')
      .eq('id', session.user.id)
      .single();
    
    if (!profile || !profile.is_active || (profile.role !== 'member' && profile.role !== 'admin')) {
      toast.error("Access Denied - Members Only! Contact an admin for access.");
      await supabase.auth.signOut();
      navigate("/");
      return;
    }
    
    setUser(session.user);
    fetchMyProjects(session.user.id);
  };

  const fetchMyProjects = async (userId: string) => {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
    
    if (error) toast.error("Error fetching projects");
    else setProjects(data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (!newProject.title || !newProject.creator_name) {
        toast.error("Title and Creator Name are required");
        return;
    }
    
    if (!projectImageFile && !newProject.image_url) {
        toast.error("Please upload an image or provide an image URL");
        return;
    }

    setSubmitting(true);
    let imageUrl = newProject.image_url;
    
    // Upload image file if provided
    if (projectImageFile) {
      const { uploadImage } = await import('@/lib/uploadImage');
      const uploadedUrl = await uploadImage(projectImageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      } else {
        setSubmitting(false);
        return;
      }
    }
    
    const { error } = await supabase.from('projects').insert([{
        ...newProject,
        image_url: imageUrl,
        user_id: user.id,
        status: 'pending' 
    }]);

    if (error) {
        toast.error(error.message);
    } else {
        toast.success("Work submitted for approval!");
        setIsSubmitOpen(false);
        setNewProject({ category: 'Graphic' });
        setProjectImageFile(null);
        setProjectImagePreview(null);
        fetchMyProjects(user.id);
    }
    setSubmitting(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'approved': return <span className="inline-flex items-center text-green-600 font-medium text-sm"><CheckCircle className="w-4 h-4 mr-1"/> Approved</span>;
        case 'rejected': return <span className="inline-flex items-center text-red-600 font-medium text-sm"><XCircle className="w-4 h-4 mr-1"/> Rejected</span>;
        default: return <span className="inline-flex items-center text-yellow-600 font-medium text-sm"><Clock className="w-4 h-4 mr-1"/> Pending</span>;
    }
  };

  if (loading) return <div className="p-10 flex justify-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-background text-foreground">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border shadow-sm">
            <div>
                <h1 className="text-3xl font-bold text-foreground">
                    Welcome, {user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'Member'}!
                </h1>
                <p className="text-muted-foreground mt-1">Manage your submissions and track their status.</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-border hover:bg-secondary hover:text-secondary-foreground">
                <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
             <div>
                <h2 className="text-lg font-semibold">My Projects</h2>
                <p className="text-sm text-gray-500">{projects.length} submissions total</p>
             </div>
             
             <Dialog open={isSubmitOpen} onOpenChange={setIsSubmitOpen}>
                <DialogTrigger asChild>
                    <Button><Plus className="mr-2 h-4 w-4"/> Submit New Work</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Submit Work</DialogTitle>
                        <DialogDescription>Submit your best work for approval. An admin will review it.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="cname">Creator Name (Display Name)</Label>
                            <Input id="cname" placeholder="e.g. John Doe" value={newProject.creator_name || ""} onChange={(e) => setNewProject({...newProject, creator_name: e.target.value})} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="title">Project Title</Label>
                            <Input id="title" value={newProject.title || ""} onChange={(e) => setNewProject({...newProject, title: e.target.value})} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={newProject.category} onValueChange={(val: any) => setNewProject({...newProject, category: val})}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Graphic">Graphic</SelectItem>
                                    <SelectItem value="UI/UX">UI/UX</SelectItem>
                                    <SelectItem value="3D">3D</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="projectImage">Project Image</Label>
                            <Input 
                                id="projectImage" 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        setProjectImageFile(file);
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setProjectImagePreview(reader.result as string);
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="cursor-pointer"
                            />
                            {projectImagePreview && (
                                <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border">
                                    <img src={projectImagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            {!projectImagePreview && newProject.image_url && (
                                <div className="mt-2 relative w-full h-32 rounded-md overflow-hidden border">
                                    <img src={getDirectImageUrl(newProject.image_url)} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <div className="text-xs text-muted-foreground">Or paste an image URL below:</div>
                            <Input 
                                id="imageUrl" 
                                placeholder="https://..." 
                                value={newProject.image_url || ""} 
                                onChange={(e) => setNewProject({...newProject, image_url: e.target.value})} 
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="insta">Instagram Link (Optional)</Label>
                            <Input id="insta" value={newProject.instagram_link || ""} onChange={(e) => setNewProject({...newProject, instagram_link: e.target.value})} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleSubmit} disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>

        {/* Projects List */}
        <Card>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Preview</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {projects.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">You haven't submitted any projects yet.</TableCell>
                        </TableRow>
                    )}
                    {projects.map((project) => (
                        <TableRow key={project.id}>
                            <TableCell>
                                <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                                    <img src={getDirectImageUrl(project.image_url)} alt={project.title} className="h-full w-full object-cover" />
                                </div>
                            </TableCell>
                            <TableCell className="font-medium">{project.title}</TableCell>
                            <TableCell>{project.category}</TableCell>
                            <TableCell>{getStatusBadge(project.status)}</TableCell>
                            <TableCell className="text-right text-gray-500">
                                {new Date(project.created_at).toLocaleDateString()}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>

      </div>
    </div>
  );
};

export default MemberDashboard;
