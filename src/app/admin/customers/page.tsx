"use client";
import { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Button } from "@/app/components/ui/button";
import { AlertDialogHeader } from "@/app/components/ui/alert-dialog";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { toast } from "sonner";

interface Customer {
  id: string;
  uid: string;
  email: string;
  role: string;
  createdAt: string;
}

function getRoleStyles(role: string): string {
  if (role?.toLowerCase() === "admin") return "bg-blue-100 text-blue-800";
  return "bg-gray-100 text-gray-800";
}

function capitalize(text: string): string {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );

  useEffect(() => {
    async function fetchCustomers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const customersList: Customer[] = querySnapshot.docs.map(
          (doc) =>
            ({
              ...doc.data(),
              id: doc.id,
            } as Customer),
        );

        setCustomers(customersList);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCustomers();
  }, []);

  const handleOpenDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDialogOpen(true);
  };

  async function handleConfirmToggleRole() {
    if (!selectedCustomer) return;

    setIsUpdating(true);

    const { id, role: currentRole } = selectedCustomer;
    const newRole = currentRole === "admin" ? "user" : "admin";
    const docRef = doc(db, "users", id);

    try {
      await updateDoc(docRef, { role: newRole });

      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === id ? { ...customer, role: newRole } : customer,
        ),
      );
      setDialogOpen(false);
      setSelectedCustomer(null);
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role.");
    } finally {
      setIsUpdating(false);
    }
  }

  const currentRole = selectedCustomer?.role;
  const newRole = currentRole === "admin" ? "user" : "admin";

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="min-h-screen flex flex-col bg-white font-inter overflow-x-hidden">
        <main className="flex-1 px-10 py-5 flex justify-center">
          <div className="flex flex-col max-w-4xl w-full">
            <div className="flex flex-col sm:flex-row justify-between gap-3 p-4">
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold text-gray-900">Customers</p>
                <p className="text-sm text-gray-500">
                  Manage and view all registered users
                </p>
              </div>
            </div>

            <div className="overflow-x-auto px-4 py-3">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-white">
                  <tr>
                    {["Email", "Role", "Joined Date", "User ID", "Actions"].map(
                      (col) => (
                        <th
                          key={col}
                          className="px-4 py-3 text-left text-sm font-medium text-gray-900"
                        >
                          {col}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-t border-gray-200">
                      <td className="px-4 py-2 text-sm text-gray-900">
                        {customer.email}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleStyles(
                            customer.role,
                          )}`}
                        >
                          {capitalize(customer.role)}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 text-sm text-gray-500">
                        {customer.uid}
                      </td>
                      <td className="px-4 py-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-sm font-bold text-blue-600 p-0 h-auto"
                          onClick={() => handleOpenDialog(customer)}
                        >
                          Change Role
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedCustomer && (
                <>
                  Are you sure you want to change the role for{" "}
                  <strong>{selectedCustomer.email}</strong>?
                  <br />
                  This will change their role from{" "}
                  <strong>{capitalize(currentRole!)}</strong> to{" "}
                  <strong>{capitalize(newRole)}</strong>.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmToggleRole}
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
