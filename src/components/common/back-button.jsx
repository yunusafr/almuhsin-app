import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Tombol kembali.
 *
 * - `to`: navigasi ke path tertentu (mis. "/" atau "/app")
 * - tanpa `to`: kembali ke halaman sebelumnya (history.back)
 */
export default function BackButton({ to, label = "Kembali", className }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  if (to) {
    return (
      <Button
        variant="outline"
        size="sm"
        nativeButton={false}
        className={className}
        render={<Link to={to} />}
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        {label}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className={className}
    >
      <ArrowLeft className="mr-1.5 h-4 w-4" />
      {label}
    </Button>
  );
}
