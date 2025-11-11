type CardProps = {
  children: any;
  className?: string;
  onClick?: () => void;
};

export const Card = ({ children, className = "", onClick }: CardProps) => (
  <div
    className={`card ${
      onClick ? "cursor-pointer transition hover:border-emerald-500/40" : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

export const Primary = ({ children, onClick }: { children: any; onClick?: any }) => (
  <button onClick={onClick} className="btn btn-primary">
    {children}
  </button>
);

export const Secondary = ({ children, onClick }: { children: any; onClick?: any }) => (
  <button onClick={onClick} className="btn btn-outline">
    {children}
  </button>
);

export const Section = ({ title, right, children }: { title: string; right?: any; children: any }) => (
  <Card>
    <div className="flex items-center justify-between mb-2">
      <div className="text-[14px] font-semibold">{title}</div>
      {right && <div className="text-[12px] text-emerald-300">{right}</div>}
    </div>
    {children}
  </Card>
);
