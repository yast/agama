//! # D-Bus interface proxy for: `org.opensuse.Agama1.Issues`
//!
//! This code was generated by `zbus-xmlgen` `5.0.0` from D-Bus introspection data.
//! Source: `org.opensuse.Agama1.Progress.bus.xml`.
//!
//! You may prefer to adapt it, instead of using it verbatim.
//!
//! More information can be found in the [Writing a client proxy] section of the zbus
//! documentation.
//!
//! This type implements the [D-Bus standard interfaces], (`org.freedesktop.DBus.*`) for which the
//! following zbus API can be used:
//!
//! * [`zbus::fdo::IntrospectableProxy`]
//! * [`zbus::fdo::PropertiesProxy`]
//!
//! Consequently `zbus-xmlgen` did not generate code for the above interfaces.
//!
//! [Writing a client proxy]: https://dbus2.github.io/zbus/client.html
//! [D-Bus standard interfaces]: https://dbus.freedesktop.org/doc/dbus-specification.html#standard-interfaces,
use zbus::proxy;
#[proxy(interface = "org.opensuse.Agama1.Issues", assume_defaults = true)]
pub trait Issues {
    /// All property
    #[zbus(property)]
    fn all(&self) -> zbus::Result<Vec<(String, String, u32, u32)>>;
}
