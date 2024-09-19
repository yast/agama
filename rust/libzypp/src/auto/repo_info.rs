// This file was generated by gir (https://github.com/gtk-rs/gir)
// from gir-files
// DO NOT EDIT

use crate::{ffi,Context,InfoBase,RepoInfoType};
use glib::{prelude::*,signal::{connect_raw, SignalHandlerId},translate::*};
use std::{boxed::Box as Box_};

glib::wrapper! {
    #[doc(alias = "ZyppRepoInfo")]
    pub struct RepoInfo(Object<ffi::ZyppRepoInfo, ffi::ZyppRepoInfoClass>) @implements InfoBase;

    match fn {
        type_ => || ffi::zypp_repo_info_get_type(),
    }
}

impl RepoInfo {
    #[doc(alias = "zypp_repo_info_new")]
    pub fn new(context: &Context) -> RepoInfo {
        skip_assert_initialized!();
        unsafe {
            from_glib_full(ffi::zypp_repo_info_new(context.to_glib_none().0))
        }
    }

            // rustdoc-stripper-ignore-next
            /// Creates a new builder-pattern struct instance to construct [`RepoInfo`] objects.
            ///
            /// This method returns an instance of [`RepoInfoBuilder`](crate::builders::RepoInfoBuilder) which can be used to create [`RepoInfo`] objects.
            pub fn builder() -> RepoInfoBuilder {
                RepoInfoBuilder::new()
            }
        

    #[doc(alias = "zypp_repo_info_get_repo_type")]
    #[doc(alias = "get_repo_type")]
    pub fn repo_type(&self) -> RepoInfoType {
        unsafe {
            from_glib(ffi::zypp_repo_info_get_repo_type(self.to_glib_none().0))
        }
    }

    #[doc(alias = "alias")]
    pub fn connect_alias_notify<F: Fn(&Self) + 'static>(&self, f: F) -> SignalHandlerId {
        unsafe extern "C" fn notify_alias_trampoline<F: Fn(&RepoInfo) + 'static>(this: *mut ffi::ZyppRepoInfo, _param_spec: glib::ffi::gpointer, f: glib::ffi::gpointer) {
            let f: &F = &*(f as *const F);
            f(&from_glib_borrow(this))
        }
        unsafe {
            let f: Box_<F> = Box_::new(f);
            connect_raw(self.as_ptr() as *mut _, b"notify::alias\0".as_ptr() as *const _,
                Some(std::mem::transmute::<*const (), unsafe extern "C" fn()>(notify_alias_trampoline::<F> as *const ())), Box_::into_raw(f))
        }
    }

    #[doc(alias = "enabled")]
    pub fn connect_enabled_notify<F: Fn(&Self) + 'static>(&self, f: F) -> SignalHandlerId {
        unsafe extern "C" fn notify_enabled_trampoline<F: Fn(&RepoInfo) + 'static>(this: *mut ffi::ZyppRepoInfo, _param_spec: glib::ffi::gpointer, f: glib::ffi::gpointer) {
            let f: &F = &*(f as *const F);
            f(&from_glib_borrow(this))
        }
        unsafe {
            let f: Box_<F> = Box_::new(f);
            connect_raw(self.as_ptr() as *mut _, b"notify::enabled\0".as_ptr() as *const _,
                Some(std::mem::transmute::<*const (), unsafe extern "C" fn()>(notify_enabled_trampoline::<F> as *const ())), Box_::into_raw(f))
        }
    }

    #[doc(alias = "name")]
    pub fn connect_name_notify<F: Fn(&Self) + 'static>(&self, f: F) -> SignalHandlerId {
        unsafe extern "C" fn notify_name_trampoline<F: Fn(&RepoInfo) + 'static>(this: *mut ffi::ZyppRepoInfo, _param_spec: glib::ffi::gpointer, f: glib::ffi::gpointer) {
            let f: &F = &*(f as *const F);
            f(&from_glib_borrow(this))
        }
        unsafe {
            let f: Box_<F> = Box_::new(f);
            connect_raw(self.as_ptr() as *mut _, b"notify::name\0".as_ptr() as *const _,
                Some(std::mem::transmute::<*const (), unsafe extern "C" fn()>(notify_name_trampoline::<F> as *const ())), Box_::into_raw(f))
        }
    }
}

impl Default for RepoInfo {
                     fn default() -> Self {
                         glib::object::Object::new::<Self>()
                     }
                 }

// rustdoc-stripper-ignore-next
        /// A [builder-pattern] type to construct [`RepoInfo`] objects.
        ///
        /// [builder-pattern]: https://doc.rust-lang.org/1.0.0/style/ownership/builders.html
#[must_use = "The builder must be built to be used"]
pub struct RepoInfoBuilder {
            builder: glib::object::ObjectBuilder<'static, RepoInfo>,
        }

        impl RepoInfoBuilder {
        fn new() -> Self {
            Self { builder: glib::object::Object::builder() }
        }

                            pub fn alias(self, alias: impl Into<glib::GString>) -> Self {
                            Self { builder: self.builder.property("alias", alias.into()), }
                        }

                            pub fn enabled(self, enabled: bool) -> Self {
                            Self { builder: self.builder.property("enabled", enabled), }
                        }

                            pub fn name(self, name: impl Into<glib::GString>) -> Self {
                            Self { builder: self.builder.property("name", name.into()), }
                        }

                            //pub fn zypp_cppObj(self, zypp_cppObj: /*Unimplemented*/Basic: Pointer) -> Self {
                        //    Self { builder: self.builder.property("zypp-cppObj", zypp_cppObj), }
                        //}

                            pub fn zyppcontext(self, zyppcontext: &Context) -> Self {
                            Self { builder: self.builder.property("zyppcontext", zyppcontext.clone()), }
                        }

    // rustdoc-stripper-ignore-next
    /// Build the [`RepoInfo`].
    #[must_use = "Building the object from the builder is usually expensive and is not expected to have side effects"]
    pub fn build(self) -> RepoInfo {
    self.builder.build() }
}
