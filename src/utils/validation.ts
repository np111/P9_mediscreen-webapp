const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function isUUID(value: any) {
    return typeof value === 'string' && UUID_PATTERN.test(value);
}
