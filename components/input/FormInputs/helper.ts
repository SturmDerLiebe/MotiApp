import { MotiColors } from "@/constants/Colors";

export function determineInputBorderColor(
    isValid: boolean,
    isEmpty: boolean,
): string {
    if (!isValid) {
        return MotiColors.red.error;
    } else if (isEmpty) {
        return MotiColors.grey.dark1;
    } else {
        return MotiColors.grey.dark2;
    }
}
