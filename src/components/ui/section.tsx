
import React from 'react';
import { cn } from "@/lib/utils";
import { useUser } from '@clerk/clerk-react';
import { Lock } from 'lucide-react';

// Types pour les niveaux d'abonnement et les permissions
export type SubscriptionTier = 'free' | 'premium' | 'vip';
export type PermissionLevel = 'public' | 'restricted' | 'premium' | 'vip';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiredPermission?: PermissionLevel;
  trackProgress?: boolean;
  trackResourceView?: boolean;
  resourceId?: string;
  showLockIcon?: boolean;
  fallbackContent?: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ 
    className, 
    children, 
    requiresAuth = false,
    requiredPermission = 'public',
    trackProgress = false,
    trackResourceView = false,
    resourceId,
    showLockIcon = true,
    fallbackContent,
    ...props 
  }, ref) => {
    const { user, isSignedIn } = useUser();
    
    // Simulation de la vérification des permissions (à implémenter avec une vraie logique)
    const hasAccess = () => {
      if (!requiresAuth) return true;
      if (requiresAuth && !isSignedIn) return false;
      
      // Note: Cette logique de permission est simulée et devra être implémentée
      // en fonction de votre système d'abonnement réel
      const userPermission = getUserPermission();
      return checkPermission(userPermission, requiredPermission);
    };
    
    // Récupère la permission de l'utilisateur (à implémenter en fonction de votre système)
    const getUserPermission = (): PermissionLevel => {
      // Simuler différents niveaux d'accès (à remplacer par la vraie logique)
      if (!user) return 'public';
      
      // Cette logique devra être remplacée par votre système réel
      const hasPremiumMetadata = user.publicMetadata?.subscriptionTier === 'premium';
      const hasVIPMetadata = user.publicMetadata?.subscriptionTier === 'vip';
      
      if (hasVIPMetadata) return 'vip';
      if (hasPremiumMetadata) return 'premium';
      return 'restricted';
    };
    
    // Vérifie si la permission de l'utilisateur est suffisante
    const checkPermission = (userPermission: PermissionLevel, requiredPermission: PermissionLevel): boolean => {
      const permissionLevels: Record<PermissionLevel, number> = {
        'public': 0,
        'restricted': 1,
        'premium': 2,
        'vip': 3
      };
      
      return permissionLevels[userPermission] >= permissionLevels[requiredPermission];
    };
    
    // Suivi du progrès et des vues (à implémenter)
    const trackUserProgress = () => {
      if (trackProgress && isSignedIn && resourceId) {
        console.log(`Tracking progress for resource: ${resourceId}`);
        // Implémenter la logique de suivi du progrès 
        // Par exemple, appel à Supabase ou à une API
      }
    };
    
    const trackResourceViewed = () => {
      if (trackResourceView && isSignedIn && resourceId) {
        console.log(`Tracking view for resource: ${resourceId}`);
        // Implémenter la logique de suivi des ressources vues
      }
    };
    
    // Effet pour suivre les vues lorsque la section est montée
    React.useEffect(() => {
      if (hasAccess()) {
        trackUserProgress();
        trackResourceViewed();
      }
    }, [resourceId, isSignedIn]);

    // Rendu du contenu en fonction des permissions
    if (!hasAccess()) {
      return (
        <section
          ref={ref}
          className={cn("relative bg-noir-light border border-mauve/20 rounded-lg p-6", className)}
          {...props}
        >
          {fallbackContent ? (
            fallbackContent
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              {showLockIcon && <Lock className="text-mauve w-12 h-12 mb-4 opacity-70" />}
              <h3 className="text-xl font-semibold text-white mb-2">Contenu exclusif</h3>
              <p className="text-gray-400 text-center max-w-md">
                Ce contenu est réservé aux membres {requiredPermission === 'premium' ? 'premium' : 'VIP'}.
                Mettez à niveau votre abonnement pour y accéder.
              </p>
            </div>
          )}
        </section>
      );
    }

    return (
      <section
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
