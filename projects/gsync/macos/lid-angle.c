/*
 * lid-angle - query the physical MacBook lid angle sensor using IOKit HID.
 *
 * Exits 0 and prints the angle in integer degrees (0 - 180) to stdout if
 * available.
 * Exits 1 with no stdout if no sensor is present, unsupported, or read fails.
 */

#include <CoreFoundation/CoreFoundation.h>
#include <IOKit/hid/IOHIDManager.h>
#include <stdint.h>
#include <stdio.h>

#define APPLE_VENDOR_ID   0x05AC
#define APPLE_SENSOR_PID  0x8104
#define SENSOR_USAGE_PAGE 0x0020
#define SENSOR_USAGE_LAS  0x008A
#define REPORT_ID_LAS     1

int main(void) {
    IOHIDManagerRef manager = IOHIDManagerCreate(kCFAllocatorDefault, kIOHIDOptionsTypeNone);
    if (!manager) {
        return 1;
    }

    int vid = APPLE_VENDOR_ID;
    int pid = APPLE_SENSOR_PID;
    int usage_page = SENSOR_USAGE_PAGE;
    int usage = SENSOR_USAGE_LAS;

    CFNumberRef cf_vid = CFNumberCreate(kCFAllocatorDefault, kCFNumberIntType, &vid);
    CFNumberRef cf_pid = CFNumberCreate(kCFAllocatorDefault, kCFNumberIntType, &pid);
    CFNumberRef cf_up = CFNumberCreate(kCFAllocatorDefault, kCFNumberIntType, &usage_page);
    CFNumberRef cf_u = CFNumberCreate(kCFAllocatorDefault, kCFNumberIntType, &usage);

    CFMutableDictionaryRef match_dict = CFDictionaryCreateMutable(
        kCFAllocatorDefault, 4,
        &kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);

    if (cf_vid) CFDictionarySetValue(match_dict, CFSTR("VendorID"), cf_vid);
    if (cf_pid) CFDictionarySetValue(match_dict, CFSTR("ProductID"), cf_pid);
    if (cf_up)  CFDictionarySetValue(match_dict, CFSTR("UsagePage"), cf_up);
    if (cf_u)   CFDictionarySetValue(match_dict, CFSTR("Usage"), cf_u);

    IOHIDManagerSetDeviceMatching(manager, match_dict);

    if (IOHIDManagerOpen(manager, kIOHIDOptionsTypeNone) != kIOReturnSuccess) {
        if (cf_vid) CFRelease(cf_vid);
        if (cf_pid) CFRelease(cf_pid);
        if (cf_up) CFRelease(cf_up);
        if (cf_u) CFRelease(cf_u);
        CFRelease(match_dict);
        CFRelease(manager);
        return 1;
    }

    CFSetRef device_set = IOHIDManagerCopyDevices(manager);
    if (!device_set) {
        if (cf_vid) CFRelease(cf_vid);
        if (cf_pid) CFRelease(cf_pid);
        if (cf_up) CFRelease(cf_up);
        if (cf_u) CFRelease(cf_u);
        CFRelease(match_dict);
        IOHIDManagerClose(manager, kIOHIDOptionsTypeNone);
        CFRelease(manager);
        return 1;
    }

    CFIndex count = CFSetGetCount(device_set);
    const void *devices[count];
    CFSetGetValues(device_set, devices);

    int found = 0;
    int angle = 0;

    for (CFIndex i = 0; i < count; i++) {
        IOHIDDeviceRef dev = (IOHIDDeviceRef)devices[i];
        uint8_t report[8] = {0};
        CFIndex report_len = sizeof(report);

        if (IOHIDDeviceGetReport(dev, kIOHIDReportTypeFeature, REPORT_ID_LAS, report, &report_len) == kIOReturnSuccess) {
            if (report_len >= 3) {
                angle = (report[2] << 8) | report[1];
                found = 1;
                break;
            }
        }
    }

    CFRelease(device_set);
    if (cf_vid) CFRelease(cf_vid);
    if (cf_pid) CFRelease(cf_pid);
    if (cf_up) CFRelease(cf_up);
    if (cf_u) CFRelease(cf_u);
    CFRelease(match_dict);
    IOHIDManagerClose(manager, kIOHIDOptionsTypeNone);
    CFRelease(manager);

    if (found) {
        printf("%d\n", angle);
        return 0;
    }

    return 1;
}
