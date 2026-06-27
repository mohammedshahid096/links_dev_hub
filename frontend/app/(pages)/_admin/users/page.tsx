import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { Users, User as UserIcon, Shield, ShieldCheck, Mail, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { getAdminUsers } from "@/api/user/admin.user";
import { UserSearch } from "./_components/UserSearch";
import { UserPagination } from "./_components/UserPagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Admin — Users",
  description: "Manage and view all registered users in the platform.",
};

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; role?: string }>;
}) {
  const [token, resolvedParams] = await Promise.all([
    auth().then((a) => a.getToken()),
    searchParams,
  ]);

  const page = resolvedParams.page || "1";
  const search = resolvedParams.search || "";
  const role = resolvedParams.role || "";

  let usersData = null;
  let error = null;

  try {
    const response = await getAdminUsers({ page, search, role }, token);
    if (response.success) {
      usersData = response.data.data;
    } else {
      error = response.data.message || "Failed to fetch users";
    }
  } catch (err) {
    error = "Failed to connect to the server";
  }

  const users = usersData?.users || [];
  const totalPages = usersData?.totalPages || 1;
  const currentPage = parseInt(page);
  const totalCount = usersData?.totalCount || 0;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Users className="w-8 h-8 text-primary" />
            </div>
            Users Management
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-lg">
            Manage user accounts, roles, and platform access from one central location.
          </p>
        </div>
        <UserSearch />
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-xl mb-8 border border-destructive/20 flex items-center gap-3">
          <XCircle className="w-5 h-5" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <Card className="border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm overflow-hidden">
        <CardHeader className="border-b border-border/50 bg-muted/30">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">User List</CardTitle>
              <CardDescription>
                A total of {totalCount} users found
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground uppercase text-[10px] font-bold tracking-widest border-b border-border/50">
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr 
                      key={user.id} 
                      className="group hover:bg-muted/30 transition-colors duration-200"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            {user.profileUrl ? (
                              <img
                                src={user.profileUrl}
                                alt={user.name}
                                className="w-10 h-10 rounded-full border-2 border-border group-hover:border-primary/50 transition-colors object-cover shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full border-2 border-border group-hover:border-primary/50 transition-colors bg-primary/10 flex items-center justify-center text-primary font-semibold shrink-0">
                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                              </div>
                            )}
                            {user.isActive && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-foreground text-sm leading-tight">
                              {user.name}
                            </span>
                            <span className="text-muted-foreground text-xs flex items-center gap-1 mt-0.5">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {user.role === "admin" ? (
                            <Badge variant="default" className="bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/20 gap-1 px-2">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="gap-1 px-2">
                              <UserIcon className="w-3.5 h-3.5" />
                              User
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {user.isActive ? (
                          <div className="flex items-center gap-1.5 text-green-500 font-medium text-xs bg-green-500/10 w-fit px-2 py-1 rounded-full border border-green-500/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Active
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-muted-foreground font-medium text-xs bg-muted w-fit px-2 py-1 rounded-full border border-border">
                            <XCircle className="w-3.5 h-3.5" />
                            Inactive
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-muted-foreground text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(user.created_at).toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                         <Badge variant="outline" className="cursor-not-allowed opacity-50">
                           Manage
                         </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Users className="w-12 h-12 opacity-20 mb-4" />
                        <p className="text-lg font-medium">No users found</p>
                        <p className="text-sm">Try adjusting your search filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-6">
        <UserPagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </div>
  );
}
