import { createNavigationContainerRef } from '@react-navigation/native';

export const n = createNavigationContainerRef()

export function navigate(a, b) {
    if (n.isReady()) {
        n.navigate(a, b);
    }
}