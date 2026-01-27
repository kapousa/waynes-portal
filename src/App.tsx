import {Toaster} from "@/components/ui/toaster";
import {Toaster as Sonner} from "@/components/ui/sonner";
import {TooltipProvider} from "@/components/ui/tooltip";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthProvider} from "@/contexts/AuthContext";
import {LanguageProvider} from "@/contexts/LanguageContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";
import "@/lib/i18n";
import ReportDeviation from "@/pages/ReportDeviation.tsx";
import FormsList from "@/pages/FormsList.tsx";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <LanguageProvider>
            <AuthProvider>
                <TooltipProvider>
                    <Toaster/>
                    <Sonner/>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login/>}/>
                            <Route
                                path="/"
                                element={
                                    <ProtectedRoute>
                                        <Dashboard/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/forms"
                                element={
                                    <ProtectedRoute>
                                        <FormsList/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/report-deviation"
                                element={
                                    <ProtectedRoute>
                                        <ReportDeviation/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/documents"
                                element={
                                    <ProtectedRoute>
                                        <Documents/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/documents/:categorySlug"
                                element={
                                    <ProtectedRoute>
                                        <Documents/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/search"
                                element={
                                    <ProtectedRoute>
                                        <Search/>
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </BrowserRouter>
                </TooltipProvider>
            </AuthProvider>
        </LanguageProvider>
    </QueryClientProvider>
);

export default App;
