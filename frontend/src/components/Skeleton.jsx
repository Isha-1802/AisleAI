import './Skeleton.css';

/** A single shimmering skeleton block. */
export function Skeleton({ width = '100%', height = 16, radius = 6, style = {} }) {
    return (
        <span
            className="skeleton-block"
            style={{ width, height, borderRadius: radius, ...style }}
        />
    );
}

/** A grid of product-card skeletons for loading states. */
export function ProductGridSkeleton({ count = 8 }) {
    return (
        <div className="skeleton-grid">
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="skeleton-card">
                    <Skeleton height={320} radius={4} />
                    <div className="skeleton-card-body">
                        <Skeleton width="40%" height={12} />
                        <Skeleton width="80%" height={16} />
                        <Skeleton width="30%" height={16} />
                    </div>
                </div>
            ))}
        </div>
    );
}

/** Full-screen branded loader with a shimmering wordmark. */
export function BrandLoader({ label = 'AISLEAI' }) {
    return (
        <div className="brand-loader">
            <div className="brand-loader-mark">{label}</div>
            <div className="brand-loader-bar"><span /></div>
            <p className="brand-loader-sub">Curating your experience…</p>
        </div>
    );
}

export default Skeleton;
