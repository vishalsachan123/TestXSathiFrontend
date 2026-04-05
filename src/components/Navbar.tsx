import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const isDarkPage =
    location.pathname === "/signin" ||
    location.pathname === "/signup" ||
    location.pathname === "/exam-playground";

  //   const handleLogout = () => {

  //     localStorage.removeItem("token");
  //     navigate("/signin");
  //   };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");

        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/signin");
      }
    });
  };
  return (
    <div
      className={`sticky top-0 z-50 ${isDarkPage ? "bg-black" : "bg-[#F8F9FF]"}`}
    >
      <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight">
          <Link to="/">
            <span className="text-[#5A52E5]">Text</span>
            <span className={isDarkPage ? "text-white" : "text-slate-800"}>
              X
            </span>
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-md bg-red-500 text-white font-medium hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className={`px-6 py-2 rounded-md border font-medium transition ${
                  isDarkPage
                    ? "border-slate-700 text-slate-300 hover:bg-slate-800"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="px-6 py-2 rounded-md bg-[#5A52E5] text-white font-medium hover:bg-[#4a43c7] transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const location = useLocation();

//   // Check if the current path is an authentication page
//   const isDarkPage =
//     location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/exam-playground";

//   return (
//     <div
//       className={`sticky top-0 z-50 ${isDarkPage ? "bg-black" : "bg-[#F8F9FF]"}`}
//     >
//       <nav className="flex items-center justify-between px-8 py-5 max-w-7xl mx-auto w-full">
//         {/* Logo */}
//         <div className="text-2xl font-bold tracking-tight">
//           <Link to="/">
//             <span className="text-[#5A52E5]">Text</span>
//             {/* Change 'X' color based on theme */}
//             <span className={isDarkPage ? "text-white" : "text-slate-800"}>
//               X
//             </span>
//           </Link>
//         </div>

//         {/* Auth Links */}
//         <div className="flex items-center gap-4">
//           <Link
//             to="/signin"
//             // Dynamically change the Login button border and text colors
//             className={`px-6 py-2 rounded-md border font-medium transition ${
//               isDarkPage
//                 ? "border-slate-700 text-slate-300 hover:bg-slate-800"
//                 : "border-slate-300 text-slate-700 hover:bg-slate-50"
//             }`}
//           >
//             Login
//           </Link>

//           <Link
//             to="/signup"
//             className="px-6 py-2 rounded-md bg-[#5A52E5] text-white font-medium hover:bg-[#4a43c7] transition"
//           >
//             Get Started
//           </Link>
//         </div>
//       </nav>
//     </div>
//   );
// }
