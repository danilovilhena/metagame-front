export function getMediaColor(mediaType) {
	if (mediaType === 1) {
		return 'rgba(255, 76, 77, 0.75) 0px 6px 20px -4px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px';
	}
	if (mediaType === 2) {
		return 'rgba(76, 255, 184, 0.75) 0px 6px 20px -4px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px';
	}
	if (mediaType === 3) {
		return 'rgba(76, 164, 255, 0.75) 0px 6px 20px -4px, rgba(0, 0, 0, 0.8) 0px 8px 16px -8px';
	}

	return 'dark-lg';
}
